# qimatech_fullstack_test
Fullstack project for test QIMA Tech

```
QIMAtech_FullStack
│
├── backend/
│   ├── src/
│   │   ├── main/java/com/qimatech/
│   │   │   ├── controller/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   ├── config/
│   │   │   └── QimaTechApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── product/
    │   │   │   ├── product-list.component.ts
    │   │   │   ├── product-list.component.html
    │   │   │   ├── product-form.component.ts
    │   │   │   ├── product-form.component.html
    │   │   │   ├── product.service.ts
    │   │   │   └── models/
    │   │   │       └── product.model.ts
    │   │   ├── app.module.ts
    │   │   └── app-routing.module.ts
    ├── angular.json
    ├── package.json
    ├── tsconfig.app.json
    ├── tsconfig.json
    └── tsconfig.spec.json
```

### Backend:

**Paths**:

- mvn clean install -U
- mvn spring-boot:run

![Paths](image.png)

Endpoint para gerar o token:
POST: http://localhost:8080/login?username=teste

![Post username](image-1.png)

Endpoint para buscar lista de produtos com Bearer Token
GET: http://localhost:8080/api/products

![Get product list](image-2.png)

Endpoint para adicionar item com Bearer Token
POST: http://localhost:8080/api/products

![Post product item](image-3.png)

Endpoint para deletar item com Bearer Token
DEL: ttp://localhost:8080/api/products/{{id}}

![Delete product item](image-4.png)

Endpoint para editar item com Bearer Token
PUT: http://localhost:8080/api/products/{{id}}

![Put prdocut item](image-5.png)


### Frontend

Substituir o bearen token gerado no backend no arquivo auth.service:

![auth.service](image-6.png)

- npm start