# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Run the project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# install dependencies
npm install

# start local development version
npm run dev

# or start the server and open the app in a new browser tab, project should be available on http://localhost:5173 in your browser
npm run dev -- --open

```

I also added a fake API - `getFromApi` for retrieving fake cart and products data. See example in index.svelte for usage. Both include a delay to simulate network loading.

## Work to do

Adjust the `src/routes/+page.svelte` create necessary files in the `components` folder to:

- Display a loading info while the products are in loading state

- Change `+page.svelte` to display a tile for each product with the following infos:

  - Image (as image; you add also e.g.:"?imwidth=175" to the image url to get a 175px wide image)
  - Name
  - Base Price (formatted in German Currency format e.g. 1.2 will be "€1,20" )
  - Base Unit

The tiles should be displayed in a grid and as a list on screens
below 480px. In the grid the minimum tile width should be 300px and maximum should be 400px with as many tiles as possible should fit on screen.

Add an search input field on top that allows filtering the products that contain
the input in the product name.

Bonus:

- Add the count in cart (amount > 0) to the product tile (Note: You have
  to use the `sku` field to find the matching products)

### Evaluation points

- Use of state management
- Modular component design
- DRY (Reusable code)
- Rendering / Performance / Management of Component lifestyle
- Strong typing and consistent use of Typescript
- General knowledge of CSS and proper use of selector specificity
- Mobile Responsive
- Technical explanation of code
- Good Test Coverage using playwright
- Web accessibility standards are followed
- W3c Standards are followed

### Additional Information

- Even though this project is fairly simple try to organize it like you would do for larger components.

- Feel free to reach out if you have any questions

_Good luck_
