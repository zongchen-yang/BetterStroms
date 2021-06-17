// this is a test suite for the Q and A module
import getQuestions from './QAndA';
import axios from 'axios';

test('gets questions for product', async () => {
  const data = await axios.get(`http://localhost:3000/qa/questions?product_id=20103&count=100`);
  // console.log('this is the body of the first quetion', data.data.results[0]);
  expect(data.data.results[0].question_body).toBe('What fabric is the bottom made of?');
});
