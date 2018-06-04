const fs = require('fs');
const assert = require('assert');
const puppeteer = require('puppeteer');



(async() => {
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
    });
  const page = await browser.newPage();

	//ログイン処理
  await page.goto('https://supporterz.jp/recruiters/');	

	console.log("page遷移中");
	await page.type('#UserEmail', 'ikeda@fringe81.com');
	await page.type('#UserPassword', 'supporterz1');
	page.click('.ui-button-primary');
	console.log("now logining");

	await page.waitForNavigation();

	console.log("login done");

	await page.goto('https://supporterz.jp/recruiters/graduates/detail/99789');
  await page.waitForSelector('#content');
	await page.waitForSelector('.photo-main');

	console.log("now pdf making");
	await page.pdf({
    path: 'supporters.pdf',
  });

	console.log("done!!");

	await page.goto('https://supporterz.jp/recruiters/graduates/detail/58203');

	console.log("reading a page");
  await page.waitForSelector('#content');
	await page.waitForSelector('.photo-main');

	console.log("pdf making");
	await page.pdf({
    path: 'supporters2.pdf',
  });

	console.log("done!!");

    browser.close();
})();
