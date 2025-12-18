"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
// import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Upload,
  CheckCircle,
  MapPin,
  Clock,
  Briefcase,
  IndianRupee,
  GraduationCap,
} from "lucide-react";
import { useCareer } from "@/hooks/useCareer";
import { useSubmitCareer } from "@/hooks/useSubmitCareer";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobApply() {
  const { id: slug } = useParams();
  const router = useRouter();
  const { career: job, isLoading: isJobsLoading } = useCareer(slug);
  const { mutate, isPending } = useSubmitCareer();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(job);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Basic validation for file
    if (!selectedFile) {
      // You might want to show a toast here if file is strictly required
      // and browser validation didn't catch it (though required attribute helps)
      return;
    }

    const payload = {
      name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      resume: selectedFile,
      career_id: job?.id,
    };

    mutate(payload, {
      onSuccess: () => {
        router.push("/careers");
      },
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (isJobsLoading) {
    return (
      <>
        <AuroraHero
          title="Loading..."
          compact={true}
          backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
        />
        <div className="container px-4 mx-auto py-24">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="max-w-2xl mx-auto space-y-8">
              <Skeleton className="h-8 w-1/2 mx-auto" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <AuroraHero
          title="Job Not Found"
          compact={true}
          backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
        />
        <div className="container py-24 text-center">
          <h2 className="text-2xl font-bold mb-4">Position Unavailable</h2>
          <p className="text-muted-foreground mb-8">
            The job position you are looking for might have been closed or does
            not exist.
          </p>
          <Button onClick={() => router.push("/careers")}>Back to Careers</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <AuroraHero
        title={`Apply for ${job.title}`}
        compact={true}
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="container px-4 mx-auto py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Job Details Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <JobDetailCard
              icon={<MapPin />}
              label="Location"
              value={job.location}
            />
            <JobDetailCard icon={<Clock />} label="Type" value={job.type} />
            <JobDetailCard
              icon={<IndianRupee />}
              label="Salary"
              value={job.salary_range}
            />
            <JobDetailCard
              icon={<Briefcase />}
              label="Experience"
              value={`${job.experience} Years`}
            />
          </div>

          {/* Job Description & Requirements */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4">
                Job Description
              </h3>
              <div
                className="prose prose-sm dark:prose-invert text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4">Requirements</h3>
              <div
                className="prose prose-sm dark:prose-invert text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: job.requirements }}
              />
            </div>
          </div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-card border rounded-3xl p-8 md:p-12 shadow-xl mt-12"
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2">Application Form</h2>
              <p className="text-muted-foreground">
                Ready to make an impact? Send us your application.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume">Resume / CV</Label>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:bg-secondary/50 transition-colors cursor-pointer relative group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-2 text-primary">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                      <p className="font-semibold">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-xs text-primary font-medium mt-2 group-hover:underline">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground group-hover:scale-110 transition-transform" />
                      <p className="font-semibold text-foreground">
                        Upload your resume
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOCX up to 10MB
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    id="resume"
                    name="resume"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">Message / Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  name="message"
                  placeholder="Tell us why you're a great fit..."
                  className="min-h-[150px]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-lg h-12 rounded-full"
                disabled={isPending}
              >
                {isPending ? "Submitting Application..." : "Submit Application"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

function JobDetailCard({ icon, label, value }) {
  return (
    <div className="bg-card border rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
      <div className="bg-primary/10 p-3 rounded-full text-primary">{icon}</div>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  );
}
