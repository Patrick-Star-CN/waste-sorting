package team.nnmm.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysql.cj.xdevapi.JsonArray;
import team.nnmm.mysql.GetData;
import team.nnmm.mysql.SQLConn;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class GetDataServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json;charset=utf-8");
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "GET,POST");

        ObjectMapper OM = new ObjectMapper();
        PrintWriter out = resp.getWriter();
        MessageBean jsonOut = new MessageBean();

        Connection conn = SQLConn.conn();
        ArrayList<ScoreBean> res = GetData.getData(conn);
        SQLConn.disConn(conn);

        if(res != null) {
            jsonOut.setMessage("success");
            jsonOut.setData(res);
        } else {
            jsonOut.setMessage("empty");
            jsonOut.setData(null);
        }

        out.print(OM.writeValueAsString(jsonOut));
    }

    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        doGet(req, resp);
    }

    public GetDataServlet() {

    }
}
