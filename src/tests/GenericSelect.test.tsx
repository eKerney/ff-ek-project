import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { GenericSelect } from '../components/GenericSelect'

test('tests GenericSelect.tsx default select options', async () => {
  render(<GenericSelect
    <string>
    choices={['DTW', 'ABQ']}
    title=""
    defaultChoice={'GENERIC SELECT'}
    callback={() => { }}
  />)
  expect((screen.getByRole("option", { name: "GENERIC SELECT" }) as HTMLOptionElement).selected).toBe(true);
  expect((screen.getByRole("option", { name: "ABQ" }) as HTMLOptionElement).selected).toBe(false);

})

test('tests GenericSelect.tsx user select event', async () => {
  const user = userEvent.setup();
  render(<GenericSelect
    <string>
    choices={['DTW', 'ABQ']}
    title=""
    defaultChoice={'GENERIC SELECT'}
    callback={() => { }}
  />)
  // user click on DTW
  await user.selectOptions(screen.getByRole("combobox"), "DTW");
  expect((screen.getByRole("option", { name: "DTW" }) as HTMLOptionElement).selected).toBe(true);
})

test('tests GenericSelect.tsx userClick Event, and that callback was executed', async () => {
  const onChange = vi.fn();
  const user = userEvent.setup();
  render(<GenericSelect
    choices={['DTW', 'ABQ']}
    title=""
    defaultChoice={'GENERIC SELECT'}
    callback={onChange}
  />)

  await user.selectOptions(screen.getByRole("combobox"), "DTW");
  expect(onChange).toHaveBeenCalledTimes(1);
})

