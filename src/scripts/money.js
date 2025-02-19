const money = (price) => `USD ${(price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;

export default money;
