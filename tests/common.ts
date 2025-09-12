import { randomBytes } from "node:crypto";
import * as path from "node:path";
import {
	dockerBuildxBuild,
	dockerContainerRm,
	dockerContainerRun,
	dockerContextShow,
	dockerContextUse,
	dockerImageRm,
} from "@ac-essentials/cli";
import {
	type EnvVariables,
	getRandomEphemeralPort,
	isHttpAvailable,
	sleep,
} from "@ac-essentials/misc-util";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

const srcPath = path.resolve(path.join(__dirname, "..", "src"));

interface StartContainerOptions {
	bindPort?: number;
	env?: EnvVariables;
	startupDelayMs?: number;
}

export function initSuite(containerNamePrefix = "test-") {
	let initialContext: string;
	const containerName = `${containerNamePrefix}${randomBytes(20).toString("hex")}`;
	const containerImageName = `${containerName}-img`;

	async function stopContainer() {
		try {
			await dockerContainerRm([containerName], { force: true });
		} catch (_) {}
	}

	beforeAll(async () => {
		initialContext = await dockerContextShow();
		await dockerContextUse("default");

		await stopContainer();

		try {
			await dockerImageRm([containerImageName], { force: true });
		} catch (_) {}

		await dockerBuildxBuild(srcPath, { tags: [containerImageName] });
	});

	afterAll(async () => {
		try {
			await dockerImageRm([containerImageName], { force: true });
		} catch (_) {}

		try {
			await dockerContextUse(initialContext);
		} catch (_) {}
	});

	afterEach(async () => {
		await stopContainer();
	});

	return {
		startContainer: async (options?: StartContainerOptions) => {
			const bindPort = options?.bindPort ?? getRandomEphemeralPort();

			await dockerContainerRun(containerImageName, undefined, undefined, {
				detach: true,
				name: containerName,
				publish: [`${bindPort}:80`],
				env: options?.env,
			});

			const url = `http://localhost:${bindPort}`;

			vi.waitUntil(() => {
				return isHttpAvailable(url);
			});

			await sleep(options?.startupDelayMs ?? 1000);

			return {
				url,
				bindPort,
			};
		},
		containerImageName,
		containerName,
	};
}
