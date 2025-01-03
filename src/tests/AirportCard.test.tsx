import { render, screen } from "@testing-library/react";
import AirPortCard from "../components/AirportCard";

test('test AirportCard.tsx renders correct data', async () => {
  render(<AirPortCard
    styleProps={""}
    ID="DTW"
    name="Detroit Metro Airport"
    runways={["KRD-123", "DJW-190"]}
    coords={[42.302, 83.230]}
  />)

  expect(screen.getByText('DTW')).toBeInTheDocument();
  expect(screen.getByText('Detroit Metro Airport')).toBeInTheDocument();

})
