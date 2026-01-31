import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your K-STAS AI assistant. I can help you with timesheet queries, payroll insights, and more. What would you like to know?",
    timestamp: "10:00 AM",
  },
];

const suggestions = [
  "What timesheets are pending approval?",
  "Show me overtime exceptions this week",
  "What's the payroll total for Acme Corp?",
  "Who has the most hours this period?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("pending") || lowerQuery.includes("approval")) {
      return "There are currently **12 timesheets pending approval**:\n\n- 5 awaiting supervisor review\n- 4 awaiting finance approval\n- 3 awaiting final sign-off\n\nWould you like me to show you the details of any specific pending approvals?";
    }
    
    if (lowerQuery.includes("overtime") || lowerQuery.includes("exception")) {
      return "I found **8 overtime exceptions** this week:\n\n1. **Michael Chen** - 48 hours (TechStart Inc)\n2. **Sarah Johnson** - 45 hours (Acme Corp)\n3. **James Wilson** - 44 hours (Global Solutions)\n\nThe overtime threshold is set at 42 hours. Would you like me to flag these for review?";
    }
    
    if (lowerQuery.includes("payroll") || lowerQuery.includes("total")) {
      return "The payroll summary for **Acme Corp** this period:\n\n- Total Hours: **248.5 hours**\n- Total Amount: **$21,122.50**\n- Employees: **6 contractors**\n- Average Rate: **$85/hour**\n\nAll timesheets are validated and ready for export.";
    }
    
    if (lowerQuery.includes("hours") || lowerQuery.includes("most")) {
      return "Top 5 employees by hours this period:\n\n1. **Michael Chen** - 48.0 hours\n2. **Sarah Johnson** - 45.0 hours\n3. **James Wilson** - 44.0 hours\n4. **Emily Davis** - 42.5 hours\n5. **Lisa Thompson** - 40.0 hours\n\n3 of these exceed the overtime threshold.";
    }
    
    return "I understand you're asking about \"" + query + "\". I can help you with:\n\n- Timesheet status queries\n- Payroll summaries\n- Exception reports\n- Employee hour breakdowns\n\nCould you please rephrase your question or select from the suggested prompts?";
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-accent shadow-sm">
            <Sparkles className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Assistant</h1>
            <p className="text-muted-foreground">
              Ask questions about timesheets, payroll, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 rounded-xl border border-border bg-card shadow-card overflow-hidden flex flex-col">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 animate-slide-up ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-accent shadow-sm">
                    <Bot className="h-5 w-5 text-accent-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-5 py-3.5 ${
                    message.role === "user"
                      ? "gradient-primary text-primary-foreground shadow-sm"
                      : "bg-muted/70"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content.split("**").map((part, i) =>
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </p>
                  <p
                    className={`mt-2 text-xs ${
                      message.role === "user" ? "opacity-70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Suggestions */}
        <div className="border-t border-border p-4 bg-muted/20">
          <p className="text-xs font-medium text-muted-foreground mb-3">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="text-xs hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-colors"
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about timesheets, payroll, exceptions..."
              className="flex-1 bg-background/50 focus:bg-background transition-colors"
            />
            <Button type="submit" className="gradient-accent text-accent-foreground shadow-sm px-4">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
