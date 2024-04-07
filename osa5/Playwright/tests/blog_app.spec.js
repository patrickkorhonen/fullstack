const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByRole("heading", { name: "Login" });
    await expect(locator).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("textbox").first().fill("mluukkai");
      await page.getByRole("textbox").last().fill("salainen");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("textbox").first().fill("mluukkai");
      await page.getByRole("textbox").last().fill("salasana");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("textbox").first().fill("mluukkai");
      await page.getByRole("textbox").last().fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("a blog created by playwright");
      await textboxes[1].fill("tester");
      await textboxes[2].fill("www.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText(
          "a new blog a blog created by playwright by tester added"
        )
      ).toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("a blog created by playwright");
      await textboxes[1].fill("tester");
      await textboxes[2].fill("www.com");
      await page.getByRole("button", { name: "create" }).click();
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes: 1")).toBeVisible();
    });

    test("blog can be deleted", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("a blog created by playwright");
      await textboxes[1].fill("tester");
      await textboxes[2].fill("www.com");
      await page.getByRole("button", { name: "create" }).click();
      await page.getByRole("button", { name: "view" }).click();
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "delete" }).click();
      await expect(
        page.getByRole("button", { name: "view" })
      ).not.toBeVisible();
    });

    test("can not delete blog created by other user", async ({ request, page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("a blog created by playwright");
      await textboxes[1].fill("tester");
      await textboxes[2].fill("www.com");
      await page.getByRole("button", { name: "create" }).click();
      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByRole("button", { name: "delete" })).toBeVisible();
      await page.getByRole("button", { name: "logout" }).click();
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Testi Testinen",
          username: "testi",
          password: "salasana",
        },
      });
      await page.getByRole("textbox").first().fill("testi");
      await page.getByRole("textbox").last().fill("salasana");
      await page.getByRole("button", { name: "login" }).click();
      await page.getByRole("button", { name: "view" }).click();
      await expect(
        page.getByRole("button", { name: "delete" })
      ).not.toBeVisible();
    });

    test("blogs are sorted by likes", async ({ page }) => {
        await page.getByRole("button", { name: "new blog" }).click();
        const textboxes = await page.getByRole("textbox").all();
        await textboxes[0].fill("a blog created by playwright");
        await textboxes[1].fill("tester");
        await textboxes[2].fill("www.com");
        await page.getByRole("button", { name: "create" }).click();
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await page.getByRole("button", { name: "hide" }).click();
        await page.getByRole("button", { name: "new blog" }).click();
        const textboxes2 = await page.getByRole("textbox").all();
        await textboxes2[0].fill("second blog created by playwright");
        await textboxes2[1].fill("tester");
        await textboxes2[2].fill("www.morelikes.com");
        await page.getByRole("button", { name: "create" }).click();
        await page.getByRole("button", { name: "view" }).nth(1).click();
        await page.getByRole("button", { name: "like" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await page.getByRole("button", { name: "hide" }).click();
        await page.getByRole("button", { name: "view" }).first().click();
        await expect(page.getByText("www.morelikes.com")).toBeVisible();

    })
  });
});
