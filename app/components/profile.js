function Profile({ profile }) {

    return (
        <div>
            <div className="w-64"><img src={profile.pictureUrl} /></div>
            <div>{profile.displayName}</div>
            <div>{profile.userId}</div>

        </div>
    )
}

export default Profile