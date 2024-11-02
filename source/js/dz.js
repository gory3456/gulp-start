// исходник НЕЛЬЗЯ ИЗМЕНЯТЬ

const flats = [
    {
        floor: 3,
        rooms: 2,
        project: {
            id: 1,
            name: 'Foriver',
        },
    },
    {
        floor: 1,
        rooms: 3,
        project: {
            id: 2,
            name: 'Riversky',
        },
    },
    {
        floor: 5,
        rooms: 4,
        project: {
            id: 1,
            name: 'Foriver',
        },
    },
    {
        floor: 2,
        rooms: 2,
        project: {
            id: 2,
            name: 'Riversky',
        },
    },
    ];
  //ВАРИАНТ 4(вроде более правильный вариант)
    const addedProjectsMap = new Map;

    const projectAll = flats.map(flat => {
        const { project, ...flatWithoutProject } = flat;
        if (!addedProjectsMap.has(project.id)) {
        const newProject = {
            name: flat.project.name,
            id: flat.project.id,
            flats: [flatWithoutProject],
        };
        addedProjectsMap.set(project.id, newProject);
        } else {
            addedProjectsMap.get(project.id).flats.push(flatWithoutProject);
        }
    });
    const addedProjects = Array.from(addedProjectsMap.values())
    console.log(addedProjects)

  //ВАРИАНТ 3(после подсказки)
  // const addedProjects = [];

  // const projectAll = flats.map(flat => {
  //   const { project, ...flatWithoutProject } = flat;

  //   let existingProject = addedProjects.find(proj => proj.id === project.id);

  //   if (!existingProject) {
  //     const newProject = {
  //       name: flat.project.name,
  //       id: flat.project.id,
  //       flats: [flatWithoutProject],
  //     };
  //     addedProjects.push(newProject);
  //   } else {
  //     existingProject.flats.push(flatWithoutProject);
  //   }
  // });

  // console.log(addedProjects)

  // ВАРИАНТ 2 (с нейронкой)
  // const uniqueProjects = Array.from(new Set(flats.map(flat => flat.project.id)))
  //   .map(id => {
  //     const { name } = flats.find(flat => flat.project.id === id).project;
  //     return {
  //       id,
  //       name,
  //       flats: flats
  //         .filter(flat => flat.project.id === id)
  //         .map(flat => ({
  //           floor: flat.floor,
  //           rooms: flat.rooms,
  //         }))
  //     };
  //   });

  // console.log(uniqueProjects);

  // ВАРИАНТ 1
  // const foriverFlats = flats
  //   .filter(flat => flat.project.name === 'Foriver')    //On
  //   .map(flat => ({                                     //On²
  //     floor: flat.floor,
  //     rooms: flat.rooms
  //   }));

  // const foriver = [{ id: 1, name: 'Foriver', flats: [...foriverFlats] }]

  // const riverskyFlats = flats
  //   .filter(flat => flat.project.name === 'Riversky')   //On
  //   .map(flat => ({                                     //On²
  //     floor: flat.floor,
  //     rooms: flat.rooms
  //   }));
  // const riversky = [{ id: 2, name: 'Riversky', flats: [...riverskyFlats] }]
  // const projects = [...foriver, ...riversky]
  // console.log(projects)
  // чего нужно добиться
  // const projects = [
  //   {
  //     id: 1,
  //     name: 'Foriver',
  //     flats: [
  //       {
  //         floor: 3,
  //         rooms: 2,
  //       },
  //       {
  //         floor: 5,
  //         rooms: 4,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'Riversky',
  //     flats: [
  //       {
  //         floor: 2,
  //         rooms: 2,
  //       },
  //       {
  //         floor: 1,
  //         rooms: 3,
  //       },
  //     ],
  //   }
  // ];