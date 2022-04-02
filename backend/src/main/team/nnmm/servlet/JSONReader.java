package team.nnmm.servlet;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @author Patrick_Star
 * @version 1.0
 */
public class JSONReader {
    public static String receivePost(HttpServletRequest request) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream(), "utf-8"));
        String line = null;
        StringBuffer sb = new StringBuffer();
        while((line = br.readLine()) != null) {
            sb.append(line);
        }
        return sb.toString();
    }

    private JSONReader() {

    }
}