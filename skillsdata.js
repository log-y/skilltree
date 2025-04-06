const skillsData = {
    id: "root",
    label: "My Technical Skills",
    description: "Structured overview of software and machine learning expertise",
    children: [
      {
        id: "software-engineering",
        label: "Software Engineering",
        description: "Development skills proven in research and internship experience",
        children: [
          {
            id: "programming-languages",
            label: "Programming Languages",
            description: "Languages used in systems, web, and ML projects",
            children: [
              { id: "cpp", label: "C++", description: "Embedded dev, optimized ML pipelines" },
              { id: "python", label: "Python", description: "Primary language for ML and scripting" },
              { id: "java", label: "Java", description: "Used in coursework and general dev" },
              { id: "c", label: "C", description: "Low-level systems programming" }
            ]
          },
          {
            id: "cloud-devops",
            label: "Cloud & Backend",
            description: "Building and deploying cloud-native applications",
            children: [
              { id: "aws", label: "AWS", description: "Used EC2, RDS, and S3 for hosting and storage" },
              { id: "mysql", label: "MySQL", description: "Schema design and CRUD operations" },
              { id: "mongodb", label: "MongoDB", description: "NoSQL experience for document storage" },
              { id: "http", label: "HTTP APIs", description: "Built REST endpoints for frontend/backend" },
              { id: "adb", label: "ADB", description: "Flashed and pushed builds to embedded hardware" }
            ]
          },
          {
            id: "testing-quality",
            label: "Testing & Quality",
            description: "Writing tests and ensuring software reliability",
            children: [
              { id: "unit-testing", label: "Unit Testing", description: "Hundreds of automated tests written" },
              { id: "automated-testing", label: "Automation", description: "Continuous testing for quick iteration" }
            ]
          },
          {
            id: "web-dev",
            label: "Web Development",
            description: "Frontend tooling and UI design",
            children: [
              { id: "react", label: "React", description: "Built and deployed projects for thousands of users" },
              { id: "tailwind", label: "Tailwind CSS", description: "Styled UI components and layouts" }
            ]
          }
        ]
      },
      {
        id: "machine-learning",
        label: "Machine Learning",
        description: "ML systems built across research and internship projects",
        children: [
          {
            id: "deep-learning",
            label: "Deep Learning",
            description: "Neural networks for language and vision tasks",
            children: [
              { id: "transformers", label: "Transformers", description: "Built a mini LLM using PyTorch and CommonCrawl" },
              { id: "pytorch", label: "PyTorch", description: "Core framework for building DL models" },
              { id: "cnn-lstm", label: "CNNs & LSTMs", description: "Used in speech recognition models" }
            ]
          },
          {
            id: "classical-ml",
            label: "Classical ML",
            description: "Traditional ML techniques and model evaluation",
            children: [
              { id: "scikit", label: "scikit-learn", description: "Trained regression and classification models" },
              { id: "feature-engineering", label: "Feature Engineering", description: "Data cleaning and selection for ML" }
            ]
          },
          {
            id: "model-training",
            label: "Model Training",
            description: "Training optimization and evaluation",
            children: [
              { id: "training-pipeline", label: "Training Pipelines", description: "Used mixed precision and LR scheduling" },
              { id: "evaluation", label: "Evaluation", description: "Measured accuracy, loss, and generalization" }
            ]
          },
          {
            id: "speech-vision",
            label: "Speech & Vision",
            description: "Domain-specific ML applications",
            children: [
              { id: "asr", label: "Speech Recognition", description: "Built ASR models with PyTorch" },
              { id: "opencv", label: "OpenCV", description: "Used with YOLO for real-time face detection" }
            ]
          }
        ]
      },
      {
        id: "math",
        label: "Mathematics",
        description: "Core CS math skills proven in math olympiads",
        children: [
          { id: "linear-algebra", label: "Linear Algebra", description: "Matrices, eigenvectors, projections in ML" },
          { id: "probability", label: "Probability", description: "Uncertainty modeling and inference" },
          { id: "optimization", label: "Optimization", description: "Gradient descent and convergence methods" },
          { id: "algorithms", label: "Algorithms & Data Structures", description: "Strong CS fundamentals" }
        ]
      }
    ]
  };
  