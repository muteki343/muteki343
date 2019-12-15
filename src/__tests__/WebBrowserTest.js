const { Builder, By } = require("selenium-webdriver");

let driver;

describe("入力フォーム デモ", () => {
  driver = new Builder().forBrowser("chrome").build();
  process.on("unhandledRejection", console.dir);
  beforeAll(async() => {
    // テスト対象のページへアクセス
    await driver.get(
      "http://ics-drive.jp/sandbox/demo/demo.html"
    );
  });
  afterAll(() => {
    return driver.quit();
  });

  it("名前欄の必須入力チェック その1", async () => {
    // 何も入力せずにSubmitする
    await driver.findElement(By.id("submitButton")).click();

    // エラーメッセージを取得して、エラー文言が正しいかチェックする
    const errorMessage = await driver
      .findElement(By.id("error_name"))
      .getText();
    expect(errorMessage).toEqual("名前を入力してください。");
  });

  it("名前欄の必須入力チェック その2", async () => {
    // 名前を入力してSubmitする
    await driver
      .findElement(By.id("name"))
      .sendKeys("品川太郎");
    await driver.findElement(By.id("submitButton")).click();

    // エラーメッセージを取得して、エラー文言が空であるかチェックする
    const errorMessage = await driver
      .findElement(By.id("error_name"))
      .getText();
    expect(errorMessage).toEqual("");
  });
});