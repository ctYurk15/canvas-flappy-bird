class Progress
{
    constructor()
    {
        if(localStorage.getItem('last_highscore') == null)
        {
            localStorage.setItem('last_highscore', 0);
        }
    }

    setNewHighscore(scores)
    {
        if(localStorage.getItem('last_highscore') < scores)
        {
            localStorage.setItem('last_highscore', scores);
            return true;
        }

        return false;
    }

    getHighscore()
    {
        return localStorage.getItem('last_highscore');
    }
}