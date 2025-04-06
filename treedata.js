const skillTreeData = [
    {
      id: "se",
      label: "Software Engineering",
      description: "Broad knowledge of SE practices",
      position: { x: 400, y: 50 },
      children: ["design", "testing"]
    },
    {
      id: "design",
      label: "Software Design",
      description: "Design principles, architecture",
      position: { x: 250, y: 200 },
      children: ["oop", "patterns"]
    },
    {
      id: "testing",
      label: "Unit Testing",
      description: "Test frameworks, TDD",
      position: { x: 550, y: 200 },
      children: ["jest", "pytest"]
    },
    {
      id: "oop", label: "OOP", description: "Object-oriented programming", position: { x: 200, y: 350 }, children: []
    },
    {
      id: "patterns", label: "Design Patterns", description: "GoF patterns", position: { x: 300, y: 350 }, children: []
    },
    {
      id: "jest", label: "Jest", description: "JS unit testing", position: { x: 500, y: 350 }, children: []
    },
    {
      id: "pytest", label: "Pytest", description: "Python testing", position: { x: 600, y: 350 }, children: []
    }
  ];
  