
# **PolePosition-GPT / F1-AI: Retrieval-Augmented Generation (RAG) Application**    

## **Overview**     
**F1-AI** is a cutting-edge Retrieval-Augmented Generation (RAG) application designed to provide highly accurate, context-aware answers to questions about Formula 1 racing. The application leverages the power of OpenAI's GPT-4 model and a vector database to enhance its ability to retrieve and generate relevant information efficiently.  

This project showcases how to build a RAG application using the following technologies:  
- **TypeScript**: For developing robust and scalable code.  
- **OpenAI API**: To harness GPT-4 for natural language understanding and generation.  
- **DataStax Astra DB**: A managed cloud database for high-performance vector storage.  
- **Playwright**: For automated data scraping and testing.  

## **Prerequisites**  
Before you get started, ensure you have the following:  
- [Node.js](https://nodejs.org/en/download/) (latest LTS version recommended).  
- [OpenAI API Key](https://platform.openai.com/signup/).  
- [DataStax Astra DB Account](https://www.datastax.com/astra).  

## **Installation**  

1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/IAmTomShaw/f1-rag-ai.git  
   ```  

2. **Navigate to the Project Directory and Install Dependencies**:  
   ```bash  
   cd F1-RAG-AI  
   npm install  
   ```  

## **Configuration**  

1. Create a `.env` file in the root directory and include the following environment variables:  
   ```bash  
   OPENAI_API_KEY=your-openai-api-key  
   ASTRA_DB_ID=your-astra-db-id  
   ASTRA_DB_REGION=your-astra-db-region  
   ASTRA_DB_USERNAME=your-astra-db-username  
   ASTRA_DB_PASSWORD=your-astra-db-password  
   ```  

2. Ensure the application code properly references and loads these environment variables using a package like `dotenv`.  

## **Usage**  

### **1. Ingest Data**  
Modify the list of URLs to be scraped in the `src/ingest.ts` file. Then, run the following command to scrape data and store it in the Astra DB:  
   ```bash  
   npm run ingest  
   ```  

### **2. Query the Application**  
Test the RAG application by running the predefined query in the `src/answer.ts` file:  
   ```bash  
   npm run answer  
   ```  

This will execute a context-aware query against the scraped data, delivering relevant and precise answers about Formula 1.  

## **License**  
This project is open source and available under the MIT License. For details, see the [LICENSE](LICENSE) file.  

## **Credits**  
This project was designed and developed by **[MANAI Mohamed Mortadha](https://www.linkedin.com/in/mannai-mortadha/)**, an AI Engineer and innovator committed to building cutting-edge applications that showcase the potential of AI in practical, real-world scenarios.  

