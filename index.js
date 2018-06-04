const fs = require('fs');
const assert = require('assert');
const puppeteer = require('puppeteer');
const readline = require("readline");


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
	await page.type('#UserEmail', 'ID');
	await page.type('#UserPassword', 'PASS');
	page.click('.ui-button-primary');
	console.log("now logining");

	await page.waitForNavigation();

	console.log("login done");

	await makePdfs(page)
	console.log("dll one!!");

    browser.close();
})();

async function makePdfs(page){
  const fileData = await fs.readFileSync('./students.txt').toString().split('\n');
	for (data of fileData) {
  	if(data.trim() != ""){ 
			console.log("TARGET URL:" + data);
			await	page.goto(data);
			var wkname = await page.$eval('.prof-name', item => {
   			 return item.textContent;
			});
			var name = wkname.replace(' プロフィール未公開','');
			console.log("NAME:" + name);
 			await	page.waitForSelector('#content');
			await	page.waitForSelector('.photo-main');

			console.log("now pdf making");
			await	page.pdf({
				path: name + '.pdf',
  		});
			console.log("done!!");
		}else{
			console.log("skip");
		}
	}
}

