export default function UserProfilePage({ params }: any) {
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p>{params.id} profile page</p>
    </div>
  );
}
