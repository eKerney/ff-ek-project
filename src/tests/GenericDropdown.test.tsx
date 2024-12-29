import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { GenericSelect } from '../components/GenericSelect'

test('tests GenericDropdown.tsx default select options', async () => {
  render(<GenericSelect
    <string>
    choices={['Full Surface', 'Filtered Surface']}
    title=""
    defaultChoice={'GENERIC DROPDOWN'}
    callback={() => { }}
  />)
  expect((screen.getByRole("option", { name: "GENERIC DROPDOWN" }) as HTMLOptionElement).selected).toBe(true);
  expect((screen.getByRole("option", { name: "Filtered Surface" }) as HTMLOptionElement).selected).toBe(false);

})

test('tests GenericDropdown.tsx user select event', async () => {
  const user = userEvent.setup();
  render(<GenericSelect
    <string>
    choices={['Full Surface', 'Filtered Surface']}
    title=""
    defaultChoice={'GENERIC DROPDOWN'}
    callback={() => { }}
  />)
  // user click on Full Surface
  await user.selectOptions(screen.getByRole("combobox"), "Full Surface");
  expect((screen.getByRole("option", { name: "Full Surface" }) as HTMLOptionElement).selected).toBe(true);
})

