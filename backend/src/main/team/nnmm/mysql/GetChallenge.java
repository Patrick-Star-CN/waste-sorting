package team.nnmm.mysql;

import team.nnmm.servlet.ChallengeBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Random;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class GetChallenge {
    public static ArrayList getArray (Connection conn) {
        PreparedStatement psql = null;
        ResultSet re = null;
        ArrayList<ChallengeBean> result = new ArrayList<>();
        try {
            String sql = "select * from wastedata";
            psql = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            re = psql.executeQuery();
            if(re.isBeforeFirst()) {
                re.last();
                int length = 14;//re.getRow();
                int n = 0;
                long  t = System.currentTimeMillis();
                Random rand = new Random(t);
                while(n < 30) {
                    ChallengeBean result_ = new ChallengeBean(rand.nextInt(length - 1) + 1);
                    result.add(result_);
                    n ++;
                }
            } else {
                result = null;
            }
            return result;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    private GetChallenge() {
    }
}
