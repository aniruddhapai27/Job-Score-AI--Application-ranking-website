const axios = require("axios");
const pdf = require("pdf-parse");

// Function to fetch job skills and resumes
const fetchJobAndResumeData = async () => {
  try {
    // Fetch job data
    const jobResponse = await axios.get(
      "http://127.0.0.1:4000/api/company/getSkillsById/674abefd9b7e68929e8178de"
    );
    const companies = jobResponse?.data?.data?.skills; // Adjusted for company-based data
    console.log(companies);

    // Fetch resume data
    const resumeResponse = await axios.get(
      "http://127.0.0.1:4000/api/employee/getAllResume"
    );
    const resumes = resumeResponse?.data?.resumes;
    console.log(resumes);

    return { companies, resumes };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch job or resume data.");
  }
};

// Function to download and parse resumes
const parseResumes = async (resumes) => {
  try {
    const parsedResumes = [];

    for (const resume of resumes) {
      if (!resume?.resume) {
        console.warn("Resume URL missing:", resume);
        continue;
      }

      try {
        const response = await axios.get(resume.resume, {
          responseType: "arraybuffer",
        });
        const pdfData = await pdf(response.data);
        parsedResumes.push({
          _id: resume._id,
          text: pdfData.text || "", // Ensure empty text fallback
        });
      } catch (parseError) {
        console.error("Error parsing a resume:", parseError.message);
        parsedResumes.push({
          _id: resume._id,
          text: "", // Empty text for failed parsing
        });
      }
    }

    return parsedResumes;
  } catch (error) {
    console.error("Error in parsing resumes:", error.message);
    throw new Error("Failed to parse resumes.");
  }
};

// Function to calculate skill match scores
const calculateScores = (companies, resumes) => {
  if (!Array.isArray(companies) || !Array.isArray(resumes)) {
    throw new Error("Invalid input: companies or resumes are not arrays.");
  }

  return companies.map((company) => {
    const companyRankedJobs = company.jobs.map((job) => {
      if (!job.skills || !Array.isArray(job.skills)) {
        console.warn("Job skills missing or not an array for job:", job.jobId);
        return {
          jobId: job.jobId,
          rankedResumes: [],
        };
      }

      const scores = resumes.map((resume) => {
        const resumeSkills = (resume.text || "").toLowerCase();
        const matchedSkills = job.skills.filter((skill) =>
          resumeSkills.includes(skill.toLowerCase())
        );

        return {
          resumeId: resume._id,
          matchedSkills,
          score: matchedSkills.length, // Simple scoring based on match count
        };
      });

      // Sort scores in descending order
      const sortedScores = scores.sort((a, b) => b.score - a.score);

      // Print the rank of each resume for this job
      console.log(`Job ID: ${job.jobId}`);
      sortedScores.forEach((score, index) => {
        console.log(
          `  Rank ${index + 1}: Resume ID ${score.resumeId}, Score: ${
            score.score
          }`
        );
      });

      return {
        jobId: job.jobId,
        rankedResumes: sortedScores,
      };
    });

    return {
      companyName: company.companyName || "Unknown Company",
      rankedJobs: companyRankedJobs,
    };
  });
};

// Main function to fetch data, process resumes, and calculate rankings
const main = async () => {
  try {
    const { companies, resumes } = await fetchJobAndResumeData();
    if (!companies || !resumes) {
      throw new Error("Failed to fetch companies or resumes.");
    }

    const parsedResumes = await parseResumes(resumes);
    const rankedData = calculateScores(companies, parsedResumes);

    console.log("Ranked Data:", JSON.stringify(rankedData, null, 2));
  } catch (error) {
    console.error("Error in main function:", error.message);
  }
};

module.exports = { main };
