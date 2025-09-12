import { execAsync } from "@ac-essentials/misc-util";
import { expect, suite, test } from "vitest";
import { initSuite } from "./common";

suite("redirection port", () => {
	const { startContainer } = initSuite();

	test("redirect HTTP to HTTPS on default empty HTTPS port by default", async () => {
		const { url } = await startContainer();

		const { stdout } = await execAsync(`curl -I ${url}`, {
			encoding: "utf-8",
		});

		const headLines = stdout.split("\n").map((s) => s.trim());

		const locationHeader = headLines.find((v) => v.startsWith("Location:"));

		expect(locationHeader).toEqual("Location: https://localhost/");
	});

	test("redirect HTTP to HTTPS with specific port when configured", async () => {
		const { url } = await startContainer({
			env: {
				HTTP2HTTPS_REDIRECT_PORT: "5678",
			},
		});

		const { stdout } = await execAsync(`curl -I ${url}`, {
			encoding: "utf-8",
		});

		const headLines = stdout.split("\n").map((s) => s.trim());

		const locationHeader = headLines.find((v) => v.startsWith("Location:"));

		expect(locationHeader).toEqual("Location: https://localhost:5678/");
	});
});
