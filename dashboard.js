async function loadProjects() {

    const { data, error } = await window.supabaseClient
        .from("project")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return;
    }

    const table = document.getElementById("projectsTable");

    if (table) {
        table.innerHTML = "";

        data.forEach(project => {
            table.innerHTML += `
                <tr>
                    <td>${project.title}</td>
                    <td>${project.category}</td>
                    <td>${project.location}</td>
                    <td>${project.status}</td>
                </tr>
            `;
        });
    }
}

document.getElementById("saveBtn").addEventListener("click", async () => {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").value;

    const imageFile = document.getElementById("image").files[0];

    if (!imageFile) {
        alert("Please choose an image.");
        return;
    }

    const fileName = Date.now() + "-" + imageFile.name;

    const { error: uploadError } = await window.supabaseClient.storage
        .from("images")
        .upload(fileName, imageFile);

    if (uploadError) {
        alert(uploadError.message);
        return;
    }

    const { data: imageData } = window.supabaseClient.storage
        .from("images")
        .getPublicUrl(fileName);

    const image_url = imageData.publicUrl;

    const { error } = await window.supabaseClient
        .from("project")
        .insert([
            {
                title,
                description,
                location,
                category,
                status,
                image_url
            }
        ]);

    if (error) {
        alert(error.message);
        return;
    }

    alert("Project saved successfully.");

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";
    document.getElementById("category").value = "";
    document.getElementById("status").value = "";
    document.getElementById("image").value = "";

    loadProjects();
});

loadProjects();