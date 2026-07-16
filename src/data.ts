export interface Section {
  id: string;
  title: string;
  signal: string;
  code: string;
  extraText?: string;
  proTips?: string[];
}

export interface Part {
  id: string;
  title: string;
  sections: Section[];
}

export const intro =
  "These three technical interviews collectively will assess your skills for product sense, data modeling, SQL, ETL, and coding in Python. You'll be using our virtual whiteboard interfaces Coderpad and Excalidraw (optional) to communicate ideas, write actual SQL and Python, draw schemas, and visualize data and process flow.\n\nOne of the three technical interviews will be AI-assisted. This means you may use AI tools during most sections of that interview — but we are evaluating your judgment, reasoning, and technical decision-making, so AI output on its own is not treated as an answer.";

export const playbookTips = [
  {
    title: "Built-in AI Assistant Only",
    description: "The CoderPad session used in the interview will include a built-in AI assistant — this is the only AI tool you are permitted to use. You may not use external AI tools such as ChatGPT, Gemini, Copilot, or any other LLM during the interview.",
  },
  {
    title: "Understand the Output",
    description:
      "Whether AI generates code, SQL queries, data model designs, or metric recommendations, it is crucial that you understand what was produced and why. Be prepared to explain the logic, identify trade-offs, and describe how you would modify or extend the output.",
  },
  {
    title: "Managing AI Hallucinations",
    description:
      "Be aware that AI can hallucinate or lead you in an unhelpful direction — for example, suggesting metrics that don't align with the product scenario, producing incorrect joins, or generating flawed schema designs. Validate AI-generated output before incorporating it into your solution.",
  },
  {
    title: "Communicate Your Thought Process",
    description:
      "Just like in traditional interviews, vocalize your thought process as you work through the problem. Walk your interviewer through how you are using AI and why, not just the output it produces.",
  },
  {
    title: "Unblocking Yourself",
    description:
      "Leverage AI to unblock yourself if you get stuck — whether it's a syntax issue in SQL or Python, brainstorming dimensions for a data model, or exploring product metrics for a scenario you're less familiar with. Treat it as a productivity tool, not a substitute for your own reasoning.",
  },
];

export const parts: Part[] = [
  {
    id: "part-1",
    title: "Focus Areas & Preparation",
    sections: [
      {
        id: "sec-1",
        title: "Product Sense",
        signal:
          "At Meta, we expect data engineers to have not only a strong technical aptitude but also a keen product sense. All three technical interviews will be case studies of typical product challenges that we solve with data.",
        extraText:
          "Your interviewer will assess your ability to think critically about the needs of the product in each scenario and how you translate those needs into a robust technical solution. One way you can practice this is to think about metrics that companies similar to Meta might use. For example, you can look at their financial statements to see what metrics they deem strategically important. From there, you should think through how you would calculate those metrics, and what you would do if they started moving unexpectedly.",
        code: `# Practice Example: Metric Identification & Calculation
# Think through how you would define and calculate metrics like DAU/MAU

def calculate_monthly_active_users(user_activity_logs):
    """
    How would you measure the success or failure of a product feature?
    Consider both primary metrics and counter-metrics.
    """
    pass`,
        proTips: [
          "Always think about counter-metrics when proposing primary metrics.",
          "Look at the company's financial statements for inspiration on their strategic KPIs.",
          "Vocalize how you'd debug unexpected movements in these metrics."
        ],
      },
      {
        id: "sec-2",
        title: "Data Modeling",
        signal:
          "You’ll brainstorm the data needs of a user product. Then you’ll design a data mart to support analytics use cases and write select SQL statements to produce specific results.",
        extraText:
          "To practice data modeling, go through the main products of several large tech companies, such as Meta, LinkedIn, or Amazon. Ask yourself, how would you model each function you use from the organization’s product? Create logging designs for how you think data should be captured, then design data models to support analytical queries and reporting needs for those products.",
        code: `-- Dimensional Modeling Practice
-- Understand Denormalization and Dimensional Modeling Techniques

CREATE TABLE fct_user_engagement (
    event_id BIGINT,
    user_id BIGINT,
    event_type VARCHAR(100),
    event_timestamp TIMESTAMP,
    device_id VARCHAR(100),
    session_id VARCHAR(100),
    -- Metric columns...
);

CREATE TABLE dim_users (
    user_id BIGINT,
    registration_date DATE,
    country_code VARCHAR(2),
    account_type VARCHAR(20)
);`,
        proTips: [
          "Think through logging designs early on — how does the raw data land?",
          "Review denormalization techniques for fast OLAP reads.",
          "Identify clear primary and foreign keys and state their assumptions."
        ],
      },
      {
        id: "sec-3",
        title: "ETL (SQL & Python)",
        signal:
          "We’ll ask you to focus on basic SQL constructs. Practice all types of joins, aggregate functions, analytical functions, set operators, and subqueries.",
        extraText:
          "You can take the work you did in data modeling, and practice how you’d load and transform the data from the logging sources into your target tables using SQL. During this exercise, also think through how you might help improve efficiency and scalability for processing large data volumes.",
        code: `-- SQL Tutorial & Practice
-- Focus on window functions, complex joins, and aggregations

SELECT 
    user_id,
    DATE_TRUNC('week', event_timestamp) AS active_week,
    COUNT(DISTINCT event_id) AS total_events,
    SUM(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) AS total_purchases,
    ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY DATE_TRUNC('week', event_timestamp) DESC) as recency_rank
FROM fct_user_engagement
WHERE event_timestamp >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY 1, 2;`,
        proTips: [
          "Write clean, formatted SQL that is easy for the interviewer to read.",
          "Talk out loud about edge cases like NULL values or timezone differences.",
          "Consider efficiency and scalability — ask if there are scale constraints you should model around."
        ],
      },
      {
        id: "sec-4",
        title: "Coding (Python)",
        signal:
          "Make sure that you know all the data structures and how to manipulate them well. Familiarize yourself with string, sets operations, etc., in your programming in Python.",
        extraText:
          "Make sure you understand how dictionaries, lists, and loops work. You will be expected to demonstrate your skills independently on two of the technical interviews without AI assistance.",
        code: `def analyze_user_sessions(sessions: list[dict]) -> dict:
    """
    Ensure you know all the data structures and how to manipulate them well.
    Familiarize yourself with string, sets operations, dictionaries, lists, and loops.
    """
    user_stats = {}
    for session in sessions:
        uid = session.get('user_id')
        duration = session.get('duration_sec', 0)
        
        if uid not in user_stats:
            user_stats[uid] = {'total_sessions': 0, 'total_time': 0}
            
        user_stats[uid]['total_sessions'] += 1
        user_stats[uid]['total_time'] += duration
        
    return user_stats`,
        proTips: [
          "Talk through the time and space complexity of your chosen data structures.",
          "Don't optimize prematurely, but know the O(n) trade-offs of lists vs sets/dicts.",
          "Keep it simple: a working O(n^2) is better than a broken O(n log n)."
        ],
      },
      {
        id: "sec-5",
        title: "AI Usage",
        signal:
          "One of the three technical interviews will be AI-assisted. In that interview, your interviewer will also assess how effectively you use AI tools and prompts.",
        extraText:
          "How to use AI well: Use it to brainstorm options, draft an approach, or suggest checks — then filter, prioritize, validate, and decide. Your final answer is what you write on the left side of CoderPad. If you include AI-generated text there, we may ask you to explain it and why you chose it.",
        code: `# AI Assistant Workflow

# 1. Use it to brainstorm options
# 2. Draft an approach
# 3. Suggest checks

# -> THEN: filter, prioritize, validate, and decide.

# Remember: AI output on its own is not treated as an answer.
# We are evaluating your judgment, reasoning, and technical decision-making.`,
        proTips: [
          "Use the AI as a sounding board to brainstorm approaches.",
          "Don't blindly paste AI output — treat it like code a junior engineer wrote that you need to review.",
          "Call out potential AI hallucinations or non-optimal suggestions out loud to demonstrate your expertise."
        ],
      },
    ],
  },
];
