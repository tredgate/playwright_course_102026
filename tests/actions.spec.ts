// tests/actions.spec.ts
import { test } from "@playwright/test";
import path from "path";

test("fill and pressSequentially", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  const usernameInput = page.locator("#username");
  await usernameInput.fill("Start");
  await usernameInput.fill("End"); // ? fill nahrazuje stávající hodnoty v polích, výsledek bude: username="End"
  await usernameInput.pressSequentially("Kde toto bude?"); // ?  pressSequentially nepřepisuje stávající hodnotu, výsledek: username="EndKde toto bude?"
  await usernameInput.clear(); // ? Vyčistí hodnotu pole (vymaže)
  await usernameInput.pressSequentially("Dlouhý text", { delay: 200 });
});

test("selectOption - Select from Options", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  const genderOption = page.locator("#gender");
  await genderOption.selectOption("female"); // ? Výběr <option> z <select> prvku pomocí atributu value <option value="hodnota">
  await genderOption.selectOption({ label: "Male" }); // ? Výběr <option> z <select> prvku pomocí textu prvku <option>Hodnota</option>
});

test("check, uncheck - Radio, Checkbox", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  await page.locator("#contact-phone").check(); // ? Zakliknutí prvku (radio)
  await page.locator("#interests-travel").check(); // ? Zakliknutí prvku (checkbox)
  await page.locator("#interests-travel").uncheck(); // ? Odkliknutí prvku (pouze pro checkbox)
});

test("Date - fill input with date type", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  await page.locator("#date-of-birth").fill("1995-12-30"); // ! Pozor <option type="date"> se musí vyplňovat ve formátu ISO 8601: YYYY-MM-DD (příklad: 2000-12-31)
  //   await page.locator("#date-of-birth").fill("01.01.1999"); // ! Nebude fungovat, chyba: The specified value "01.01.1999" does not conform to the required format, "yyyy-MM-dd"
});

test("File Upload", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  // * Identifikuji soubor pomocí jeho cesty a uložím do proměnné
  const filePath = path.resolve(
    import.meta.dirname,
    "../assets/upload_file.txt",
  );
  // ? Ve starších Node.js (<20.11):   const filePath = path.resolve(__dirname, "../assets/upload_file.txt");

  // ? require - napovídá lokální cestu k souboru, nepoužívat přímo v kódu, vždy zakomentovat nebo odstranit po získání cesty.
  //require("../assets/")

  // * Nastavit listenera na event "filechooser"
  const fileChooserPromise = page.waitForEvent("filechooser"); // ! Nesmí být await před page, jinak začneme čekat a await čeká na daném řádku dokud se příkaz nedokončí (odchyt eventu).
  await page.locator("#file-upload").click();
  const catchedFileChooser = await fileChooserPromise; // ? Počká na odchycení eventu a uloží výsledek do proměnné (prohlížeč čeká, že fileChooser pošle soubor)
  await catchedFileChooser.setFiles(filePath); // ? Nastaví výsledek filechooser naším souborem => soubor se nahraje do prohlížeče

  // ? Pozastaví běh testu na x ms => v našem případě 1 sec.
  // ! Tato metoda se nesmí používat pro běžná čekání na stavy
  await page.waitForTimeout(1000);
});

test("Slider - input range", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/registration.html");
  await page.locator("#experience").fill("4");
  await page.locator("#experience").fill("10");
  // await page.locator("#experience").fill("15"); // ? Hodnota mimo limity inputu: Error: locator.fill: Error: Malformed value
});
