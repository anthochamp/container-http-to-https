import { sleep } from "./lang/sleep";

export async function waitForHttpAvailable(
	input: string | URL,
	timeoutMs: number,
) {
	const time0 = Date.now();
	do {
		let success = false;
		try {
			await fetch(input, {
				redirect: "manual",
			});

			success = true;
		} catch (_) {
			success = false;
		}

		if (success) break;
		await sleep(50);
	} while (Date.now() - time0 < timeoutMs);
}
