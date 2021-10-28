// const mode = 'DEVELOPMENT'
const mode = 'PRODUCTION'

export default function URIs() {
    if (mode === 'DEVELOPMENT') return (
        {
            ProductsURI: "http://192.168.43.114:1234/api/products/",
            ProductEditURI: "http://192.168.43.114:1234/api/product/",
        }
    )
    if (mode === 'PRODUCTION') return (
        {
            ProductsURI: "/api/products/",
            ProductEditURI: "/api/product/",
        }
    )

}


//< V1.28OCT20211200
//> V1.28OCT20212120