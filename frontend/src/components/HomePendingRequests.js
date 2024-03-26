// Inside HomePendingRequests component
const HomePendingRequests = ({ pendingMembers }) => {
  return (
    <div>
      <h2>Pending Requests</h2>
      <ul>
        {pendingMembers.map((member, index) => (
          <li key={index}>
            {member}
            <button>Accept</button>
            <button>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePendingRequests;
