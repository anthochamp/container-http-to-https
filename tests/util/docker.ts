import { exec as exec_ } from "node:child_process";
import type { Url } from "node:url";
import { promisify } from "node:util";
import {
	type EnvVarName,
	type EnvVarValue,
	stringifyEnvVar,
} from "./shell/env";
import { escapeSQE } from "./shell/escape";

const exec = promisify(exec_);

export type DockerContainerId = string;
export type DockerContainerName = string;

export async function dockerContextShow(): Promise<string> {
	const { stdout } = await exec("docker context show");

	return stdout;
}

export async function dockerContextUse(context: string) {
	await exec(`docker context use '${escapeSQE(context)}'`);
}

export interface DockerContainerRunOptions {
	detach?: boolean;
	env?: Record<EnvVarName, EnvVarValue>;
	name?: DockerContainerName;
	publish?: string[]; // ip:[hostPort]:containerPort | [hostPort:]containerPort
}

export async function dockerContainerRun(
	image: string,
	command?: string,
	commandArgs?: string[],
	options?: DockerContainerRunOptions,
) {
	const execArgs: string[] = [];

	if (options?.detach) {
		execArgs.push("--detach");
	}
	for (const [k, v] of Object.entries(options?.env ?? {})) {
		execArgs.push(`--env '${escapeSQE(stringifyEnvVar(k, v))}'`);
	}
	if (options?.name && options.name.length > 0) {
		execArgs.push(`--name '${escapeSQE(options.name)}'`);
	}
	for (const e of options?.publish ?? []) {
		execArgs.push(`--publish '${escapeSQE(e)}'`);
	}

	execArgs.push(`'${escapeSQE(image)}'`);

	if (command) {
		execArgs.push(`'${escapeSQE(command)}'`);

		for (const commandArg of commandArgs ?? []) {
			execArgs.push(`'${escapeSQE(commandArg)}'`);
		}
	}

	await exec(`docker container run ${execArgs.join(" ")}`);
}

interface DockerContainerRmOptions {
	force?: boolean;
	link?: boolean;
	volumes?: boolean;
}

export async function dockerContainerRm(
	containers: (DockerContainerId | DockerContainerName)[],
	options?: DockerContainerRmOptions,
) {
	const execArgs: string[] = [];

	if (options?.force) {
		execArgs.push("--force");
	}
	if (options?.link) {
		execArgs.push("--link");
	}
	if (options?.volumes) {
		execArgs.push("--volumes");
	}

	for (const container of containers) {
		execArgs.push(`'${escapeSQE(container)}'`);
	}

	await exec(`docker container rm ${execArgs.join(" ")}`);
}

interface DockerImageRmOptions {
	force?: boolean;
	noPrune?: boolean;
}

type DockerImageId = string;

export async function dockerImageRm(
	images: DockerImageId[],
	options?: DockerImageRmOptions,
) {
	const execArgs: string[] = [];

	if (options?.force) {
		execArgs.push("--force");
	}
	if (options?.noPrune) {
		execArgs.push("--no-prune");
	}

	for (const image of images) {
		execArgs.push(`'${escapeSQE(image)}'`);
	}

	await exec(`docker image rm ${execArgs.join(" ")}`);
}

export interface DockerBuildOptions {
	tags?: string[];
}

export async function dockerBuild(
	pathOrUrl: string | Url,
	options?: DockerBuildOptions,
) {
	const execArgs: string[] = [];

	for (const tag of options?.tags ?? []) {
		execArgs.push(`--tag '${escapeSQE(tag)}'`);
	}

	execArgs.push(`'${escapeSQE(pathOrUrl.toString())}'`);

	await exec(`docker build ${execArgs.join(" ")}`);
}
