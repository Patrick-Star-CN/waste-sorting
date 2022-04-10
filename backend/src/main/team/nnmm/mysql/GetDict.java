package team.nnmm.mysql;

import team.nnmm.servlet.WasteBean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class GetDict {
    public static ArrayList<WasteBean> getDict(Connection conn) {
        PreparedStatement psql = null;
        ResultSet re = null;
        ArrayList<WasteBean> result = new ArrayList<>();
        try {
            String sql = "select * from wastedata";
            psql = conn.prepareStatement(sql);
            re = psql.executeQuery();
            if(re.isBeforeFirst()) {
                while(re.next()) {
                    WasteBean result_ = new WasteBean(re.getString("name"), re.getInt("id"), re.getInt("width"), re.getInt("height"), re.getInt("type"));
                    result.add(result_);
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
}
