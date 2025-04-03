import { Avatar, PersonIcon } from '@my-monorepo/design-system';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Avatar
        style={{
          backgroundColor: 'primary',
          color: 'primary',
        }}
      />
      12
      <PersonIcon color="black" />
      12
    </div>
  );
}

export default App;
