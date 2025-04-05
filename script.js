async function cloneProduct() {
    const sourceOrg = document.getElementById("sourceOrg").value.trim();
    const targetOrg = document.getElementById("targetOrg").value.trim();
    const sourceToken = document.getElementById("sourceToken").value.trim();
    const targetToken = document.getElementById("targetToken").value.trim();
    const productName = document.getElementById("productName").value.trim();
    const newProductName = document.getElementById("newProductName").value.trim();
    const output = document.getElementById("output");

    output.textContent = "Cloning product...";

    try {
        // Step 1: Fetch product from source org
        const res = await fetch(`https://apigee.googleapis.com/v1/organizations/${sourceOrg}/apiproducts/${productName}`, {
            headers: { Authorization: `Bearer ${sourceToken}` }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.statusText}`);
        }

        let data = await res.json();

        // Step 2: Modify product
        data.name = newProductName;
        if (data.displayName) data.displayName = newProductName;

        // Remove metadata fields
        delete data.createdAt;
        delete data.createdBy;
        delete data.lastModifiedAt;
        delete data.lastModifiedBy;

        // Step 3: Create product in target org
        const createRes = await fetch(`https://apigee.googleapis.com/v1/organizations/${targetOrg}/apiproducts`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${targetToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const createData = await createRes.json();

        if (!createRes.ok) {
            throw new Error(createData.error?.message || "Error creating new product.");
        }

        output.textContent = "Product cloned successfully:\n\n" + JSON.stringify(createData, null, 2);

    } catch (err) {
        output.textContent = "Error:\n" + err.message;
    }
}

async function createNewProduct() {
    const targetOrg = document.getElementById("targetOrg").value.trim();
    const targetToken = document.getElementById("targetToken").value.trim();
    const newProductName = document.getElementById("newProductName").value.trim();
    const output = document.getElementById("output");

    output.textContent = "Creating new product...";

    try {
        const data = {
            name: newProductName,
            displayName: newProductName,
            // Add other necessary fields for a new product
        };

        const createRes = await fetch(`https://apigee.googleapis.com/v1/organizations/${targetOrg}/apiproducts`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${targetToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const createData = await createRes.json();

        if (!createRes.ok) {
            throw new Error(createData.error?.message || "Error creating new product.");
        }

        output.textContent = "New product created successfully:\n\n" + JSON.stringify(createData, null, 2);

    } catch (err) {
        output.textContent = "Error:\n" + err.message;
    }
}

async function createProductFromExisting() {
    const sourceOrg = document.getElementById("sourceOrg").value.trim();
    const targetOrg = document.getElementById("targetOrg").value.trim();
    const sourceToken = document.getElementById("sourceToken").value.trim();
    const targetToken = document.getElementById("targetToken").value.trim();
    const productName = document.getElementById("productName").value.trim();
    const newProductName = document.getElementById("newProductName").value.trim();
    const output = document.getElementById("output");

    output.textContent = "Creating product from existing...";

    try {
        // Step 1: Fetch product from source org
        const res = await fetch(`https://apigee.googleapis.com/v1/organizations/${sourceOrg}/apiproducts/${productName}`, {
            headers: { Authorization: `Bearer ${sourceToken}` }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.statusText}`);
        }

        let data = await res.json();

        // Step 2: Modify product
        data.name = newProductName;
        if (data.displayName) data.displayName = newProductName;

        // Remove metadata fields
        delete data.createdAt;
        delete data.createdBy;
        delete data.lastModifiedAt;
        delete data.lastModifiedBy;

        // Step 3: Create product in target org
        const createRes = await fetch(`https://apigee.googleapis.com/v1/organizations/${targetOrg}/apiproducts`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${targetToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const createData = await createRes.json();

        if (!createRes.ok) {
            throw new Error(createData.error?.message || "Error creating new product.");
        }

        output.textContent = "Product created from existing successfully:\n\n" + JSON.stringify(createData, null, 2);

    } catch (err) {
        output.textContent = "Error:\n" + err.message;
    }
}