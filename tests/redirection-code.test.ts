import { execAsync } from "@ac-essentials/misc-util";
import { expect, suite, test } from "vitest";
import { initSuite } from "./common";

suite("redirection code", () => {
	const { startContainer } = initSuite();

	test("redirect with 308 Permanent Redirect by default", async () => {
		const { url } = await startContainer();

		const { stdout } = await execAsync(`curl -I ${url}`, {
			encoding: "utf-8",
		});

		const headLines = stdout.split("\n").map((s) => s.trim());

		expect(headLines[0]).toMatch(/^HTTP\/.+ 308 Permanent Redirect$/);
	});

	test("test redirect with 308 Permanent Redirect when configured", async () => {
		const { url } = await startContainer({
			env: {
				HTTP2HTTPS_TEMPORARY_REDIRECT: "0",
			},
		});

		const { stdout } = await execAsync(`curl -I ${url}`, {
			encoding: "utf-8",
		});

		const headLines = stdout.split("\n").map((s) => s.trim());

		expect(headLines[0]).toMatch(/^HTTP\/.+ 308 Permanent Redirect$/);
	});

	test("redirect with 307 Temporary Redirect when configured", async () => {
		const { url } = await startContainer({
			env: {
				HTTP2HTTPS_TEMPORARY_REDIRECT: "1",
			},
		});

		const { stdout } = await execAsync(`curl -I ${url}`, {
			encoding: "utf-8",
		});

		const headLines = stdout.split("\n").map((s) => s.trim());

		expect(headLines[0]).toMatch(/^HTTP\/.+ 307 Temporary Redirect$/);
	});
});
