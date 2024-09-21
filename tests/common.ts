import path from "node:path";
import { after, afterEach, before } from "node:test";
import {
	dockerBuild,
	dockerContainerRm,
	dockerContainerRun,
	dockerContextShow,
	dockerContextUse,
	dockerImageRm,
} from "@ac-essentials/docker-cli";
import { findGitDir } from "@ac-essentials/find-git-dir";
import { type EnvVars, waitForHttpAvailable } from "@ac-essentials/misc-util";

export const kContainerImageName = "test-img";
export const kContainerName = "test";
export const kMaxStartupDelayMs = 1000;
export const kDefaultBindPort = 1234;
export const kDefaultUrl = `http://localhost:${kDefaultBindPort}`;

interface StartContainerOptions {
	bindPort?: number;
	env?: EnvVars;
}

export async function startContainer(options?: StartContainerOptions) {
	await dockerContainerRun(kContainerImageName, undefined, undefined, {
		detach: true,
		name: kContainerName,
		publish: [`${options?.bindPort ?? kDefaultBindPort}:80`],
		env: options?.env,
	});

	await waitForHttpAvailable(
		`http://localhost:${kDefaultBindPort}`,
		kMaxStartupDelayMs,
	);
}

async function stopContainer() {
	try {
		await dockerContainerRm([kContainerName], { force: true });
	} catch (_) {}
}

export function initSuite() {
	let initialContext: string;

	before(async () => {
		const rootDir = await findGitDir();

		initialContext = await dockerContextShow();
		await dockerContextUse("default");

		await stopContainer();

		try {
			await dockerImageRm([kContainerImageName], { force: true });
		} catch (_) {}

		const srcPath = path.resolve(path.join(path.dirname(rootDir), "src"));
		await dockerBuild(srcPath, { tags: [kContainerImageName] });
	});

	after(async () => {
		try {
			await dockerImageRm([kContainerImageName], { force: true });
		} catch (_) {}

		try {
			await dockerContextUse(initialContext);
		} catch (_) {}
	});

	afterEach(async () => {
		await stopContainer();
	});
}
