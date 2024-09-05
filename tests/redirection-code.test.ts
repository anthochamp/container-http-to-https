import assert from "node:assert";
import { exec as exec_ } from "node:child_process";
import { suite, test } from "node:test";
import { promisify } from "node:util";
import { initSuite, kDefaultUrl, startContainer } from "./common";

const exec = promisify(exec_);

suite("redirection code", () => {
  initSuite();

  test("redirect with 308 Permanent Redirect by default", async () => {
    await startContainer();

    const { stdout } = await exec(`curl -I ${kDefaultUrl}`);

    const headLines = stdout.split("\n").map((s) => s.trim());

    assert.match(headLines[0], /^HTTP\/.+ 308 Permanent Redirect$/);
  });

  test("test redirect with 308 Permanent Redirect when configured", async () => {
    await startContainer({
      env: {
        HTTP2HTTPS_TEMPORARY_REDIRECT: "0",
      },
    });

    const { stdout } = await exec(`curl -I ${kDefaultUrl}`);

    const headLines = stdout.split("\n").map((s) => s.trim());

    assert.match(headLines[0], /^HTTP\/.+ 308 Permanent Redirect$/);
  });

  test("redirect with 307 Temporary Redirect when configured", async () => {
    await startContainer({
      env: {
        HTTP2HTTPS_TEMPORARY_REDIRECT: "1",
      },
    });

    const { stdout } = await exec(`curl -I ${kDefaultUrl}`);

    const headLines = stdout.split("\n").map((s) => s.trim());

    assert.match(headLines[0], /^HTTP\/.+ 307 Temporary Redirect$/);
  });
});
