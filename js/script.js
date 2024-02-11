const loadData = async (isShowAll) => {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const jsonData = await response.json();
    const aiToolsDatas = jsonData.data.tools;
    // console.log(aiToolsDatas);
    displayData(aiToolsDatas, isShowAll);
}

const displayData = (toolsData, isShowAll) => {
    const toolsContainer = document.getElementById('ai-tools-container');

    // handle seeMore 
    const seeMoreSection = document.getElementById('see-more-section');
    if (!isShowAll) {
        toolsData = toolsData.slice(0, 6);
        seeMoreSection.classList.remove('hidden');
    }
    else {
        seeMoreSection.classList.add('hidden');
    }
    toolsData.forEach(toolData => {
        // console.log(Object.keys(toolData));
        // console.log(toolData);
        const newDiv = document.createElement('div');
        newDiv.classList = `card bg-base-100 shadow-sm border-2`;
        newDiv.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${toolData.image}" alt="Shoes"
                        class="rounded-xl" />
        </figure>
        <div class="card-body">
                    <h3 class="font-bold text-2xl">Features</h3>
                    <ol class="list-decimal text-muted ps-4">
                        <li>${toolData.features[0]}</li>
                        <li>${toolData.features[1]}</li>
                        <li>${toolData.features[2]}</li>
                    </ol>
                    <hr class="my-2">

                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="font-bold text-2xl">${toolData.name}</h3>
                            <p class='text-muted text-lg my-3'>&#128197; ${toolData.published_in}</p>
                        </div>
                        <div>
                            <button onclick="handleShowDetails('${toolData.id}')" class="btn btn-circle text-orange-700 bg-slate-50 text-2xl font-semibold">
                                &#10132;
                            </button>
                        </div>
                    </div>
                </div>
        `;
        toolsContainer.appendChild(newDiv);

    });
}

const handleShowDetails = async (id) => {
    // console.log(id);
    const detailsData = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const jsonData = await detailsData.json();
    displayShowDetails(jsonData.data);
}

const displayShowDetails = (detailsData) => {
    // console.log(detailsData)
    // console.log(detailsData.description);
    const showDetailsModal = document.getElementById('show-details');

    showDetailsModal.textContent = '';
    const detailsDiv = document.createElement('div');
    detailsDiv.classList = `relative pt-12`;


    detailsDiv.innerHTML = `
    <form method="dialog">
        <button class="btn btn-lg btn-circle border-red-400 absolute right-1 top-1">✕</button>
    </form>
    <div class="modal-box max-w-7xl">
            <!--modal left section -->
        <div class="grid grid-cols-2 gap-6">
            <div class="card bg-base-100 shadow-sm border-2 border-red-600 bg-red-50 p-8">
                <p class="text-2xl font-bold">${detailsData.description}</p>
                <div class="grid grid-cols-3 gap-5 text-center my-5">
                    <p class="p-4 text-xl font-semibold bg-white text-green-700 rounded-lg">
                                        $10/<br>month<br>Basic</p>
                    <p class="p-4 text-xl font-semibold bg-white text-orange-600 rounded-lg">
                                        $50/<br>month<br>Pro</p>
                    <p class="p-4 text-xl font-semibold bg-white text-red-700 rounded-lg">
                                        Contact<br>us<br>Enterprise
                                    </p>
                </div>
                <div class="flex gap-4">
                    <div>
                        <h3 class="text-lg font-bold">Features</h3>
                        <ul class="text-muted text-sm list-disc list-inside">
                            <li>${detailsData.features[1].feature_name}</li>
                            <li>${detailsData.features[2].feature_name}</li>
                            <li>${detailsData.features[3].feature_name}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold">Integrations</h3>
                        <ul class="text-muted text-sm list-disc list-inside">
                            <li>${detailsData.features[1].description}</li>
                            <li>${detailsData.features[2].description}</li>
                            <li>${detailsData.features[3].description}</li>
                        </ul>
                    </div>
                </div>
            </div>
                <!--modal right section -->
            <div class="card bg-base-100 shadow-sm border-2">
                <figure class="px-10 pt-10">
                    <img src="${detailsData.image_link[0]}" alt="Shoes"
                                        class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title font-semibold text-2xl">${detailsData.input_output_examples[0].input}</h2>
                    <p class="text-xl">${detailsData.input_output_examples[1].output}</p>
                </div>
            </div>
        </div>
    </div>
    `;
    showDetailsModal.appendChild(detailsDiv);
    showDetailsModal.showModal();
}
const handleSeeMore = () => {
    loadData(true);
}

loadData();
