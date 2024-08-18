import ChatInterface from './components/ChatInterface';

export default function HomePage() {
  return (
    <main style={{ padding: '20px', fontFamily: 'Timesnewroman', color:'orange' }}>
      <h1>Welcome to the News Bot</h1>
      <ChatInterface />
    </main>
  );
}
