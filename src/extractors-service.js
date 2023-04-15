import puppeteer from 'puppeteer';

async function fetchCars(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const cars = await page.evaluate(() => {
    const carElements = document.querySelectorAll('.car-item-selector');
    console.log(`Found ${carElements.length} car elements`);
    const carsArray = [];

    carElements.forEach((element) => {
      const car = {
        make: element.querySelector('.make-selector')?.textContent.trim(),
        model: element.querySelector('.model-selector')?.textContent.trim(),
        year: element.querySelector('.year-selector')?.textContent.trim(),
        price: element.querySelector('.price-selector')?.textContent.trim(),
        // Add more properties as needed
      };

      carsArray.push(car);
    });

    return carsArray;
  });

  await browser.close();
  return cars;
}


export { fetchCars }; 