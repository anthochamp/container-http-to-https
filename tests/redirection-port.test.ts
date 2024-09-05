import assert from "node:assert";
import { exec as exec_ } from "node:child_process";
import { suite, test } from "node:test";
import { promisify } from "node:util";
import { initSuite, kDefaultUrl, startContainer } from "./common";

const exec = promisify(exec_);

suite("redirection port", () => {
  initSuite();

  test("redirect HTTP to HTTPS on default empty HTTPS port by default", async () => {
    await startContainer();

    const { stdout } = await exec(`curl -I ${kDefaultUrl}`);

    const headLines = stdout.split("\n").map((s) => s.trim());

    const locationHeader = headLines.find((v) => v.startsWith("Location:"));

    assert.equal(locationHeader, "Location: https://localhost/");
  });

  test("redirect HTTP to HTTPS with specific port when configured", async () => {
    await startContainer({
      env: {
        HTTP2HTTPS_REDIRECT_PORT: "5678",
      },
    });

    const { stdout } = await exec(`curl -I ${kDefaultUrl}`);

    const headLines = stdout.split("\n").map((s) => s.trim());

    const locationHeader = headLines.find((v) => v.startsWith("Location:"));

    assert.equal(locationHeader, "Location: https://localhost:5678/");
  });
});
