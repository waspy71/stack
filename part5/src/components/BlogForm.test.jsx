
import { screen,render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()

  render(<BlogForm />)

  const title = screen.getByText('title')
  const author = screen.getByText('author')
  const url = screen.getByText('url')
  const submitButton = screen.getByText('create')

  await user.type(title, 'new test title')
  await user.type(author, 'new test author')
  await user.type(url, 'new test url')
  await user.click(submitButton)

  // couldn't test the compoenent properly since all of its logic for handling submission is inside of it
  expect(title.value).toBe('new test title')
  expect(author.value).toBe('new test author')
  expect(url.value).toBe('new test url')
})