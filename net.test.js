const { expect } = require('chai');
const { clickElement, putText, getText, } = require('./lib/commands.js');
const { generateName } = require('./lib/util.js');
const { timeout } = require('puppeteer');

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto('https://qamid.tmweb.ru/client/index.php');
  //await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe('Cinema ticket booking', () => {
  test('Booking tickets for the movie Stalker', async () => {
    const expected = 'Вы выбрали билеты:';
    await clickElement(page, 'a:nth-child(3)'); // день недели
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']"); // время и зал
    await clickElement(page, 'div:nth-child(6) span:nth-child(7)'); // место в зале
    await clickElement(page, '.acceptin-button'); // забронировать
    const actual = await getText(page, '.ticket__check-title');
    expect(actual).contain(expected);
  });
  test('Purchase tickets for vip seats', async () => {
    const expected = 'Стоимость: 1000 руб.';
    await clickElement(page, 'a:nth-child(3)');
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='198']");
    await clickElement(page, 'div:nth-child(7) span:nth-child(10)');
    await clickElement(page, '.acceptin-button');
    const actual = await getText(page, 'body main p:nth-child(6)');
    expect(actual).contain(expected);
  });
  test('Attempt to book an already booked seat', async () => {
    await clickElement(page, 'a:nth-child(3)');
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']");
    await clickElement(page, '.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken');
    const button = await page.$('button.acceptin-button');
    const isDisabled = await page.evaluate((button) => button.disabled, button);
    expect(isDisabled).to.equal(true);
  });
});
