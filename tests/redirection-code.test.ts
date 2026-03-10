import { expect, suite, test } from "vitest";
import { getHeadLines, initSuite } from "./common";

suite.sequential("redirection code", () => {
	const { startContainer } = initSuite();

	test("redirect with 308 Permanent Redirect by default", async () => {
		const { url } = await startContainer();

		const headLines = await getHeadLines(url);

		expect(headLines[0]).toMatch(/^HTTP\/.+ 308 Permanent Redirect$/);
	});

	test("redirects with 308 Permanent Redirect when configured", async () => {
		const { url } = await startContainer({
			env: {
				HTTP2HTTPS_TEMPORARY_REDIRECT: "0",
			},
		});

		const headLines = await getHeadLines(url);

		expect(headLines[0]).toMatch(/^HTTP\/.+ 308 Permanent Redirect$/);
	});

	test("redirect with 307 Temporary Redirect when configured", async () => {
		const { url } = await startContainer({
			env: {
				HTTP2HTTPS_TEMPORARY_REDIRECT: "1",
			},
		});

		const headLines = await getHeadLines(url);

		expect(headLines[0]).toMatch(/^HTTP\/.+ 307 Temporary Redirect$/);
	});
});
