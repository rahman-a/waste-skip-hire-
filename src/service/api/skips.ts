import { remWasteApi } from '.'

export const skipsApi = {
  async getAll({ postcode, area }: { postcode: string; area: string }) {
    return (
      await remWasteApi.get(
        `skips/by-location?postcode=${postcode}&area=${area}`
      )
    ).data
  },
}
