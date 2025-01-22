const topSelling={
    name: 'topSelling',
    type: 'document',
    title: 'TopSelling',
    fields: [
      {
        name: "mainHeading",
        type: "string",
        title: "Main Heading",
      },
      {
        name: "title",
        type: "string",
        title: "Product Name",
      },
      {
        name: "price",
        type: "string",
        title: "Price",
      },
      {
        name: "discountedPrice",
        type: "string",
        title: "Discounted Price",
      },
      {
        name: "image",
        type: "image",
        title: "Image",
        options: { hotspot: true },
      },
    ],
  };
  export default topSelling