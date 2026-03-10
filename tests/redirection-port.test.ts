import { expect, suite, test } from "vitest";
import { getHeadLines, initSuite } from "./common";

suite.sequential("redirection port", () => {
	const { startContainer } = initSuite();

	test("redirect HTTP to HTTPS on default empty HTTPS port by default", async () => {
		const { url } = await startContainer();

		const headLines = await getHeadLines(url);

		const locationHeader = headLines.find((v) => v.startsWith("Location:"));

		expect(locationHeader).toEqual("Location: https://localhost/");
	});

	test("redirect HTTP to HTTPS with specific port when configured", async () => {
		const { url } = await startContainer({
			env: {
				HTTP2HTTPS_REDIRECT_PORT: "5678",
			},
		});

		const headLines = await getHeadLines(url);

		const locationHeader = headLines.find((v) => v.startsWith("Location:"));

		expect(locationHeader).toEqual("Location: https://localhost:5678/");
	});
});
