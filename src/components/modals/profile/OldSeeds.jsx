const OldSeeds = (props) => {
  return (
    <>
      <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto truncate max-w-full overflow-hidden select-text">
        Client seed: {props.val.client_seed}
      </p>
      <p class="text-14 text-gray-8c font-medium font-Oswald uppercase my-auto truncate max-w-full overflow-hidden select-text">
        Server seed: {props.val.server_seed}
      </p>
      <p class="text-14 text-white font-medium font-Oswald uppercase my-auto truncate max-w-full overflow-hidden select-text">
        Nonce: {props.val.nonce}
      </p>
    </>
  );
};

export default OldSeeds;
