function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

async function cloneProduct() {
    const sourceOrg = document.getElementById("sourceOrg").value.trim();
    const targetOrg = document.getElementById("targetOrg").value.trim();
    const sourceToken = document.getElementById("sourceToken").value.trim();
    const targetToken = document.getElementById("targetToken").value.trim();
    const productName = document.getElementById("productName").value.trim();
    const newProductName = document.getElementById("newProductName").value.trim();
    const newProductDisplayName = document.getElementById("newProductDisplayName").value.trim();
    const description = document.getElementById("description").value.trim();
    const environments = document.getElementById("environments").value;
    // const environments = Array.from(document.getElementById("environments").selectedOptions).map(option => option.value);
    // data.environments = environments;
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
        data.displayName = newProductDisplayName;
        data.description = description;
        data.environments = [environments];

        // Remove metadata fields
        delete data.createdAt;
        delete data.createdBy;
        delete data.lastModifiedAt;
        delete data.lastModifiedBy;
        console.log(JSON.stringify(data));
        var print1 = JSON.stringify(data);
        let print12 = JSON.stringify(data);
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

// Add functions for other functionalities (updateProduct, listProxies, listProducts, etc.)