const mysql = require("../Config/mysql").connection;


/* Users */

const GetUsersByParameters = async (searchParams) =>
{
    try
    {
        const [rows, fields] = await mysql.execute("call GetUsersByParameters(?,?,?,?,?,?,?)", [
            searchParams.SportTypeID,
            searchParams.FirstName,
            searchParams.LastName,
            searchParams.ClubID,
            searchParams.ProfessionID,
            searchParams.TeamAgeID,
            searchParams.EmploymentStatusID
        ])
        return rows[0];
    } catch (error)
    {
        throw error.sqlMessage;
    }
}

const GetUserByID = async (userID) =>
{
    try
    {
        const [rows, fields] = await mysql.execute("call GetUserDetailsByUserID(?)", [userID]);
        return rows[0][0];
    } catch (error)
    {
        throw error.sqlMessage;
    }
}

const GetUserByLoginTypeObjectID = async (loginTypeObjectID) =>
{
    try
    {
        const [rows, fields] = await mysql.query("call GetUserByLoginTypeObjectID(?)", loginTypeObjectID);
        return rows;
    } catch (error)
    {
        throw error.sqlMessage;
    }
}

const CreateUser = async (userDetails) =>
{
    try
    {
        const [rows, fields] = await mysql.execute('insert into Users (LoginTypeID,LoginTypeObjectID,Email,Password,FirstName,LastName,Birthday,ClubID,ProfessionID) values(?,?,?,?,?,?,?,?,?);',
            [
                userDetails.LoginTypeID,
                userDetails.LoginTypeObjectID === undefined ? null : userDetails.LoginTypeObjectID,
                userDetails.Email,
                userDetails.Password === undefined ? null : userDetails.Password,
                userDetails.FirstName,
                userDetails.LastName,
                userDetails.Birthday,
                userDetails.ProfessionID === undefined ? null : userDetails.ProfessionID,
                userDetails.ClubID === undefined ? null : userDetails.ClubID
            ]);

        return rows.insertId;
    } catch (error)
    {
        throw error.sqlMessage;
    }
}

const DeleteUser = async (userID) =>
{
    try
    {
        const [rows, fields] = await mysql.query('update Users set Deleted = 1 where UserID = ?', userID);

        return rows;
    } catch (error)
    {
        throw error.sqlMessage;
    }
}

const IsAdmin = async (userID) =>
{
    try
    {
        const [rows, fields] = await mysql.query('select case when RoleID = 1 then 1 else 0 end as IsAdmin from Users where UserID = ?', userID);
        return rows[0].IsAdmin;
    } catch (error)
    {
        throw error.sqlMessage;
    }
};

const UpdateUser = async (userDetails) =>
{
    try
    {
        const [rows, fields] = await mysql.execute('call UpdateUser(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
            [
                userDetails.UserID,
                userDetails.Email,
                userDetails.Password,
                userDetails.SportTypeID,
                userDetails.FirstName,
                userDetails.LastName,
                userDetails.Birthday,
                userDetails.ClubID,
                userDetails.ProfessionID,
                userDetails.TeamAgeID,
                userDetails.Resume,
                userDetails.EmploymentStatusID,
                userDetails.ProfileEmailURL,
                userDetails.MobilePhone,
                userDetails.PublicEmail,
                userDetails.PublicMobile
            ]);
        return rows;
    } catch (error)
    {
        console.log(console.error);
        throw error.sqlMessage;
    }
};

const IsEmailExists = async (email) =>
{
    try
    {
        const [rows, fields] = await mysql.query('select count(*) as UserExists from Users where email = ?', email);
        return rows[0].UserExists;
    } catch (error)
    {
        throw error.sqlMessage;
    }
}


const UpdateUserURLImage = async(userID, imageURL)=>
{
    try
    {
        const [rows, fields] = await mysql.execute('update Users set ProfileImageURL = ? where UserID = ?', [imageURL,userID]);
        console.log(rows);
        return rows;
    } catch (error)
    {
        console.log(error);
        throw error.sqlMessage;
    }
};

/* Posts */
const GetPosts = async () =>
{
    try
    {
        const [rows, fields] = await mysql.execute("Posts_ActivePosts")
        return rows;
    } catch (error)
    {
        throw error.sqlMessage;
    }
};


/*Professions*/

const GetProfessions = async () =>
{
    try
    {
        const [rows, fields] = await mysql.query("select * from Professions");
        return rows;
    } catch (error)
    {
        throw error.sqlMessage;
    }
};

const CreateProfession = async (professionName) =>
{
    try
    {
        const [rows, fields] = await mysql.query("insert into Professions(Profession) values(?)", professionName);
        return rows.insertId;
    } catch (error)
    {
        throw error.sqlMessage;
    }
};


/* Clubs */
const GetClubs = async () =>
{
    try
    {
        const [rows, fields] = await mysql.query("select * from Clubs");
        return rows;
    } catch (error)
    {
        throw error.sqlMessage;
    }
};

const CreateClub = async (clubName) =>
{
    try
    {
        const [rows, fields] = await mysql.query("insert into Clubs(Club) values(?)", clubName);
        return rows.insertId;
    } catch (error)
    {
        throw error.sqlMessage;
    }
};


module.exports =
{
    /* Users */
    GetUsersByParameters,
    GetUserByID,
    GetUserByLoginTypeObjectID,
    CreateUser,
    DeleteUser,
    IsAdmin,
    UpdateUser,
    IsEmailExists,
    UpdateUserURLImage,
    
    /* Posts */
    GetPosts,

    /*Professions*/
    GetProfessions,
    CreateProfession,

    /* Clubs */
    GetClubs,
    CreateClub

}

