import puppeteer from 'puppeteer';

async function fetchCars(url) {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.goto(url, { timeout: 60000 });

  await page.goto(url, { waitUntil: 'networkidle2' });

  const cars = await page.evaluate(() => {
    const carElements = document.querySelectorAll('.car-item-selector');
    console.log(`Found ${carElements.length} car elements`);
    const carsArray = [];

    carElements.forEach((element) => {
      const car = {
        make: element.querySelector('.fa-car + span')?.textContent.trim(),
        model: element.querySelector('h2 a')?.textContent.trim(),
        year: element.querySelector('li:nth-child(3)')?.textContent.trim().split(' ')[3],
        price: element.querySelector('.float-right b.font-weight-bold')?.textContent.trim(),
        // Add more properties as needed. Previous properties should be changed manually according to webpage we want to scrap.
      };

      carsArray.push(car);
    });

    return carsArray;
  });

  await browser.close();
  return cars;
}


export { fetchCars }; 