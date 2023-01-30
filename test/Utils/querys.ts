export const gql_add_product = `mutation AddNewProduct($ProductInput:ProductInput!) {
    addNewProduct(ProductInput:$ProductInput){
      ... on ProductGraphSchema {
        _id
        name
        stock
        bar_code
        discount_percentage
        price
      }
      ... on MongooseErrorSchema {
        errors {
          key
          message
        }
      }
    }
  }
  `;
