import { useFetch } from "nuxt/app";

const products = await useFetch(
    "https://fakestoreapi.com/products",
    {
        lazy: false,
        transform: (products:any) => {
            return products.map((product:any) => ({
                id: product.id,
                title: product.title,
                image: product.image
            }));
        }
    }
)

export default products